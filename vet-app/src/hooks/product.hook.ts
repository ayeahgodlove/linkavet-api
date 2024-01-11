import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { IProduct, ProductFormData, emptyProduct } from "models/product.model";
import {
  addProductSuccess,
  editProductSuccess,
  fetchProductsAsync,
  setActiveProduct,
} from "../redux/product.slice";
import { ProductService } from "services/product.service";
import { useTag } from "./tag.hook";

const useProduct = () => {
  const products = useSelector<IRootState, IProduct[]>(
    (state) => state.product.products
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.product.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.product.initialFetch
  );
  const product = useSelector<IRootState, IProduct>(
    (state) => state.product.product
  );

  const dispatch = useDispatch();
  const { tags } = useTag();

  const loadProducts = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchProductsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addProduct = async (product: FormData) => {
    return await ProductService.create(product)
      .then((productResponse) => {
        dispatch(addProductSuccess(productResponse.data));
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const setProduct = (product: IProduct) => {
    dispatch(setActiveProduct(product));
  };

  const editProduct = async (product: ProductFormData) => {
    return await ProductService.update(product)
      .then((productResponse) => {
        dispatch(editProductSuccess(productResponse.data));
        setProduct(productResponse.data);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };
  const getProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return emptyProduct;
    }
    return product;
  };

  // const uploadImage = async (product: ProductFormData) => {
  //   return await ProductService.upload(product)
  //     .then((resp) => {
  //       dispatch(uploadProductImage(resp.data));
  //       return true;
  //     })
  //     .catch((err) => {
  //       setformError(err);
  //       return false;
  //     });
  // };

  const getProductTags = (product: IProduct): string[] => {
    return product.tags.map((tagId) => {
      const matchingTag = tags.find((tag) => tag.id === tagId);
      return matchingTag ? matchingTag.name : "Unknown Tag"; // Handle missing tags
    });
  };

  useEffect(() => {
    // loadProducts();
  }, [product, products, isLoading, initialFetch, loadProducts]);

  return {
    product,
    products,
    isLoading,
    initialFetch,
    addProduct,
    editProduct,
    setProduct,
    getProduct,
    getProductTags
  };
};

export { useProduct };
