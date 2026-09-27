import { businessStore, seedOrders, seedExpenses, seedCustomers, foodItems } from './businessData';
export const getOrders=()=>businessStore.read('orders',seedOrders);
export const getExpenses=()=>businessStore.read('expenses',seedExpenses);
export const getFoods=()=>businessStore.read('foods',foodItems);
export const getCustomers=()=>businessStore.read('customers',seedCustomers);
export const updateOrderStatus=(id,status)=>businessStore.write('orders',getOrders().map(x=>x.id===id?{...x,status}:x));
export const saveExpenses=(items)=>businessStore.write('expenses',items);
export const saveFoods=(items)=>businessStore.write('foods',items);
export async function loginFounder({email,password}) { if(!email||!password) throw new Error('Enter your email and password.'); return {user:{email,role:'founder'},token:null}; }
