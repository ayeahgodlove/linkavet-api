import React, { useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd/es/select";
import { API_URL } from "../../config/constant";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

// Usage of DebounceSelect
interface ProductValue {
  label: string;
  value: string;
}

async function fetchProductList(searchTerm: string): Promise<ProductValue[]> {
  console.log("fetching product", searchTerm);

  return fetch(`${API_URL}/api/products/search/?searchTerm=${searchTerm}`)
    .then((response) => response.json())
    .then((body) => {
      const { data } = body;
      return data;
    })
    .catch((error) => console.log(error));
}

export const DebounceSelectComponent: React.FC = () => {
  const [value, setValue] = useState<ProductValue[]>([]);

  return (
    <DebounceSelect
      mode="multiple"
      value={value}
      placeholder="Search products"
      fetchOptions={fetchProductList}
      onChange={(newValue) => {
        setValue(newValue as ProductValue[]);
      }}
      style={{ width: "100%" }}
      clearIcon
      showSearch
      size="large"
    />
  );
};
