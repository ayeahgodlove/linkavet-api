import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import {
  MdOutlineArticle,
  MdOutlineLibraryBooks,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { FiHome, FiPhoneCall } from "react-icons/fi";
import React from "react";

const GeneralMenuItemsWithIcons: MenuProps["items"] = [
  {
    label: (
      <NavLink to="/home" style={{ padding: 0 }}>
        Home
      </NavLink>
    ),
    key: "home",
    icon: <FiHome size={21} color="#f77908" />,
  },
  {
    label: (
      <NavLink to="/products" style={{ padding: 0 }}>
        Products
      </NavLink>
    ),
    key: "products",
    icon: <MdOutlineProductionQuantityLimits size={21} color="#f77908" />,
  },

  {
    label: (
      <NavLink to="/posts" style={{ padding: 0 }}>
        Posts
      </NavLink>
    ),
    key: "posts",
    icon: <MdOutlineArticle size={21} color="#f77908" />,
  },
  {
    label: (
      <NavLink to="/courses" style={{ padding: 0 }}>
        Courses
      </NavLink>
    ),
    key: "courses",
    icon: <MdOutlineLibraryBooks size={21} color="#f77908" />,
  },
  {
    label: (
      <NavLink to="/contact-us" style={{ padding: 0 }}>
        Contact Us
      </NavLink>
    ),
    key: "contact-us",
    icon: <FiPhoneCall size={21} color="#f77908" />,
  },
];

const GeneralMenuItemsWithoutIcons: MenuProps["items"] = [
  {
    label: (
      <NavLink to="/" style={{ padding: 0 }}>
        Home
      </NavLink>
    ),
    key: "home",
  },
  {
    label: (
      <NavLink to="/products" style={{ padding: 0 }}>
        Products
      </NavLink>
    ),
    key: "products",
  },

  {
    label: (
      <NavLink to="/posts" style={{ padding: 0 }}>
        Posts
      </NavLink>
    ),
    key: "posts",
  },
  {
    label: (
      <NavLink to="/courses" style={{ padding: 0 }}>
        Courses
      </NavLink>
    ),
    key: "courses",
  },
  {
    label: (
      <NavLink to="/contact-us" style={{ padding: 0 }}>
        Contact Us
      </NavLink>
    ),
    key: "contact-us",
  },
];
export { GeneralMenuItemsWithIcons, GeneralMenuItemsWithoutIcons };
