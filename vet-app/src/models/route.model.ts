import React from "react";

export interface IRoute {
    path: string;
    private: boolean;
    exact: boolean;
    component: React.ReactNode;
    roles?: string[]
}