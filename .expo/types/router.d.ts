/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/dashboard` | `/(tabs)/orders` | `/(tabs)/orders/` | `/(tabs)/products` | `/(tabs)/products/` | `/(tabs)/products/[id]/` | `/(tabs)/products/[id]/edit` | `/(tabs)/settings` | `/(tabs)/subscription` | `/..\api\products\productByIdHook` | `/_sitemap` | `/dashboard` | `/forgot-password` | `/orders` | `/orders/` | `/products` | `/products/` | `/products/[id]/` | `/products/[id]/edit` | `/reset-password` | `/settings` | `/subscription`;
      DynamicRoutes: `/(tabs)/orders/${Router.SingleRoutePart<T>}` | `/(tabs)/products/${Router.SingleRoutePart<T>}` | `/orders/${Router.SingleRoutePart<T>}` | `/products/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(tabs)/orders/[id]` | `/(tabs)/products/[id]` | `/orders/[id]` | `/products/[id]`;
    }
  }
}
