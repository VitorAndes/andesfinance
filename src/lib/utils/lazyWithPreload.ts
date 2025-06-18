import { lazy } from "react";

export function lazyWithPreload(factory:() => Promise<any>){
    const Component = lazy(factory);
    (Component as any).preload = factory
    return Component as typeof Component & { preload: () => Promise<any> }
}