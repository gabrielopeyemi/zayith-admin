/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/home` | `/(tabs)/orders` | `/(tabs)/products` | `/(tabs)/settings` | `/(tabs)/subscription` | `/_sitemap` | `/forgot-password` | `/home` | `/orders` | `/products` | `/reset-password` | `/settings` | `/subscription`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
