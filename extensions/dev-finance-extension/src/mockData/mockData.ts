import { ShoppingCart } from "../types/cartTypes";

export const mockCartItems: ShoppingCart = {
  token: "Z2NwLXVzLWNlbnRyYWwxOjAxSFhZRUtSU0U0SFdDRUFRQ0pQR01SQks2",
  currency: "EUR",
  item_count: 3,
  total_price: 27000,
  items: [
    {
      discounted_price: 17000,
      final_price: 17000,
      handle: "adidas-superstar-80s",
      id: 45578715332837,
      image:
        "https://cdn.shopify.com/s/files/1/0693/9862/6533/files/44694ee386818f3276566210464cf341.jpg?v=1715787152",
      key: "45578715332837:b9e2ec2e904451d043ea606d50127895",
      line_price: 17000,
      product_id: 8743327596773,
      product_title: "ADIDAS | SUPERSTAR 80S",
      quantity: 1,
      title: "ADIDAS | SUPERSTAR 80S - 7 / white",
      url: "/products/adidas-superstar-80s?variant=45578715332837",
      variant_id: 45578715332837,
    },
    {
      discounted_price: 5000,
      final_price: 5000,
      handle: "adidas-classic-backpack-legend-ink-multicolour",
      id: 45578730471653,
      image:
        "https://cdn.shopify.com/s/files/1/0693/9862/6533/files/8072c8b5718306d4be25aac21836ce16.jpg?v=1715787255",
      key: "45578730471653:3c157c0c2144a79ee19cebb5c257f8ed",
      line_price: 10000,
      product_id: 8743329267941,
      product_title: "ADIDAS | CLASSIC BACKPACK | LEGEND INK MULTICOLOUR",
      quantity: 2,
      title: "ADIDAS | CLASSIC BACKPACK | LEGEND INK MULTICOLOUR - OS / blue",
      url: "/products/adidas-classic-backpack-legend-ink-multicolour?variant=45578730471653",
      variant_id: 45578730471653,
    },
  ],
};
