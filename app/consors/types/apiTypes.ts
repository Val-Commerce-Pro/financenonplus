import type { ConsorsEfiNotifications } from "@prisma/client";

export type UpdateSubscriptionDeliveryStatus = Pick<
  ConsorsEfiNotifications,
  "orderName" | "transactionId"
>;

export type ErrorConsorsSubscription = {
  errorCode: string;
  trackingId?: string;
};
