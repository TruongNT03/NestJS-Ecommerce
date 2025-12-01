import { OrderStatus } from '../enum/order-status.enum';

export const parseOrderStatus = (status: OrderStatus) => {
  const orderStatusMap: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: 'chờ xác nhận',
    [OrderStatus.CONFIRMED]: 'đã xác nhận',
    [OrderStatus.SHIPPING]: 'vận chuyển',
    [OrderStatus.COMPLETED]: 'hoàn thành',
  };

  return orderStatusMap[status];
};
