import type { ConsorsEfiNotifications } from "@prisma/client";

export type UpdateSubscriptionDeliveryStatus = Pick<
  ConsorsEfiNotifications,
  "orderId" | "transactionId"
>;
