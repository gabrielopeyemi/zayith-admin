export const API_URL = 'https://api.zayithfoods.com';
// export const storeId = `67631474edda5d63a47baa0c`
export const storeId = `671a136713baa4e5e4b854a4`

export const Base = {
  PRIMARY_COLOR: '#38c7a5',
  WHITE: '#fff',
}

export const OrderStatus = {
  ORDER_PLACED: "ORDER PLACED",
  USER_HAS_PAID: "PAYMENT COMPLETED",
  ORDER_READY_FOR_PICKUP: "ORDER READY FOR PICKUP/DELIVERY",
  ORDER_IN_TRANSIT: "ORDER IN TRANSIT",
  ORDER_HAS_ARRIVED: "ORDER HAS ARRIVED",
  ORDER_COMPLETED: "ORDER COMPLETED",
  ORDER_RETURNED: "ORDER RETURNED",
  PAID: 'PAID',
  IN_PROGRESS: 'IN_PROGRESS',
  AWAITING_SHIPMENT: 'AWAITING_SHIPMENT',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  CANCELED: 'CANCELED',
  DISPUTED: 'DISPUTED',
  SHIPPED: 'SHIPPED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED',
  REFUNDED: 'REFUNDED',
};


export const orderStatusData = [
  { label: "ORDER_PLACED", value: OrderStatus.ORDER_PLACED },
  { label: "USER_HAS_PAID", value: OrderStatus.USER_HAS_PAID },
  { label: "ORDER_READY_FOR_PICKUP", value: OrderStatus.ORDER_READY_FOR_PICKUP },
  { label: "ORDER_IN_TRANSIT", value: OrderStatus.ORDER_IN_TRANSIT },
  { label: "ORDER_HAS_ARRIVED", value: OrderStatus.ORDER_HAS_ARRIVED },
  { label: "ORDER_COMPLETED", value: OrderStatus.ORDER_COMPLETED },
  { label: "ORDER_RETURNED", value: OrderStatus.ORDER_RETURNED },
  { label: "PAID", value: OrderStatus.PAID },
  { label: "IN_PROGRESS", value: OrderStatus.IN_PROGRESS },
  { label: "AWAITING_SHIPMENT", value: OrderStatus.AWAITING_SHIPMENT },
  { label: "IN_TRANSIT", value: OrderStatus.IN_TRANSIT },
  { label: "DELIVERED", value: OrderStatus.DELIVERED },
  { label: "CANCELED", value: OrderStatus.CANCELED },
  { label: "DISPUTED", value: OrderStatus.DISPUTED },
  { label: "SHIPPED", value: OrderStatus.SHIPPED },
  { label: "FAILED", value: OrderStatus.FAILED },
  { label: "EXPIRED", value: OrderStatus.EXPIRED },
  { label: "REFUNDED", value: OrderStatus.REFUNDED },
];
