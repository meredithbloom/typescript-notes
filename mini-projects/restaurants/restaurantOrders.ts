import { restaurants, Restaurant } from "./restaurants";
import { orders, Order, PriceBracket } from "./orders";

// Add your getMaxPrice() function below:
function getMaxPrice(price: PriceBracket): number {
  if (price === PriceBracket.Low) {
    return 10.0;
  } else if (price === PriceBracket.Medium) {
    return 20.0;
  } else {
    return 30.0;
  }
}
// Add your getOrders() function below:
function getOrders(price: PriceBracket, orders: Order[][]): Order[][] {
  let filteredOrders: Order[][] = [];
  const maxPrice = getMaxPrice(price);
  console.log(maxPrice);
  orders.forEach(r => {
    r = r.filter(order => order.price <= maxPrice);
    filteredOrders.push(r);
  })
  return filteredOrders;
  
}
// Add your printOrders() function below:
function printOrders(restaurants: Restaurant, orders: Order[][]): void {
  for (let i = 0; i < restaurants.length; i++) {
    // console.log(orders[i], restaurants[i]);
    if (orders[i].length > 0) {
      console.log(restaurants[i].name);
      orders[i].forEach(o => {
        console.log(`- ${o.name} - ${o.price} `);
      })
    }
  }
}

// Main
const eligibleOrders = getOrders(PriceBracket.Low, orders);
// console.log(eligibleOrders);
printOrders(restaurants, eligibleOrders);
