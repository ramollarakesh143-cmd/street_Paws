import { foodItems } from '../data/foods';

const today = new Date();
const ago = (days, hour = 12) => { const d = new Date(today); d.setDate(d.getDate() - days); d.setHours(hour, 0, 0, 0); return d.toISOString(); };
export const seedOrders = [
  { id:'FD-2481', customer:'Aarav Mehta', mobile:'+91 98765 43210', items:[{name:'Chicken Biryani',quantity:2}], total:538, payment:'UPI', paymentStatus:'Paid', status:'Preparing', date:ago(0,13), address:'42 Park Street, Kolkata' },
  { id:'FD-2480', customer:'Diya Kapoor', mobile:'+91 98111 22334', items:[{name:'Veg Supreme Pizza',quantity:1},{name:'Cold Coffee',quantity:2}], total:676, payment:'Card', paymentStatus:'Paid', status:'Ready', date:ago(0,11), address:'18 Lake View, Kolkata' },
  { id:'FD-2479', customer:'Kabir Shah', mobile:'+91 98900 11223', items:[{name:'Butter Chicken',quantity:1}], total:369, payment:'Cash', paymentStatus:'Pending', status:'Out for Delivery', date:ago(1), address:'9B Salt Lake, Kolkata' },
  { id:'FD-2478', customer:'Mira Das', mobile:'+91 98300 44556', items:[{name:'Paneer Tikka Masala',quantity:2}], total:658, payment:'UPI', paymentStatus:'Paid', status:'Delivered', date:ago(2), address:'21 Camac Street, Kolkata' },
  { id:'FD-2477', customer:'Rohan Iyer', mobile:'+91 99000 66778', items:[{name:'Crispy Chicken Burger',quantity:2}], total:478, payment:'Card', paymentStatus:'Paid', status:'Delivered', date:ago(3), address:'11 Alipore Road, Kolkata' },
  { id:'FD-2476', customer:'Ananya Roy', mobile:'+91 98700 88990', items:[{name:'Chocolate Lava Cake',quantity:3}], total:487, payment:'UPI', paymentStatus:'Paid', status:'Cancelled', date:ago(5), address:'7 Ballygunge Place, Kolkata' },
  { id:'FD-2475', customer:'Vivaan Nair', mobile:'+91 98450 10101', items:[{name:'Hyderabadi Dum Biryani',quantity:2}], total:638, payment:'Card', paymentStatus:'Paid', status:'Delivered', date:ago(8), address:'16 New Town, Kolkata' },
  { id:'FD-2474', customer:'Sara Khan', mobile:'+91 98222 33445', items:[{name:'Peri Peri Chicken Pizza',quantity:1}], total:499, payment:'UPI', paymentStatus:'Paid', status:'Delivered', date:ago(12), address:'3 Behala, Kolkata' },
  { id:'FD-2473', customer:'Ishaan Sen', mobile:'+91 98989 76543', items:[{name:'Garlic Noodles',quantity:2}], total:428, payment:'Cash', paymentStatus:'Paid', status:'Delivered', date:ago(19), address:'55 Howrah, Kolkata' },
  { id:'FD-2472', customer:'Tara Bose', mobile:'+91 98777 55443', items:[{name:'Brownie Sundae',quantity:2}], total:378, payment:'UPI', paymentStatus:'Paid', status:'Delivered', date:ago(29), address:'2 Gariahat Road, Kolkata' },
];
export const seedExpenses = [
  {id:'EX-104',name:'Fresh produce & vegetables',category:'Vegetables',amount:4280,date:ago(0),description:'Daily market purchase',method:'UPI',status:'Paid'},
  {id:'EX-103',name:'Chicken and dairy supply',category:'Ingredients',amount:6950,date:ago(1),description:'Supplier invoice #204',method:'Bank transfer',status:'Paid'},
  {id:'EX-102',name:'Kitchen staff salaries',category:'Staff Salaries',amount:42000,date:ago(4),description:'Fortnightly payroll',method:'Bank transfer',status:'Paid'},
  {id:'EX-101',name:'Monthly rent',category:'Rent',amount:28000,date:ago(8),description:'September storefront rent',method:'Bank transfer',status:'Paid'},
  {id:'EX-100',name:'Packaging supplies',category:'Packaging',amount:3850,date:ago(2),description:'Takeaway boxes and bags',method:'UPI',status:'Paid'},
  {id:'EX-099',name:'Electricity bill',category:'Electricity',amount:6200,date:ago(12),description:'Kitchen and dining area',method:'UPI',status:'Paid'},
  {id:'EX-098',name:'LPG cylinders',category:'Gas',amount:2400,date:ago(3),description:'Commercial kitchen gas',method:'Cash',status:'Paid'},
];
export const seedCustomers = [
  {id:'CU-1008',name:'Aarav Mehta',email:'aarav.m@example.com',mobile:'+91 98765 43210',joined:ago(55),status:'Active'},
  {id:'CU-1007',name:'Diya Kapoor',email:'diya.k@example.com',mobile:'+91 98111 22334',joined:ago(48),status:'Active'},
  {id:'CU-1006',name:'Kabir Shah',email:'kabir.s@example.com',mobile:'+91 98900 11223',joined:ago(42),status:'Active'},
  {id:'CU-1005',name:'Mira Das',email:'mira.d@example.com',mobile:'+91 98300 44556',joined:ago(33),status:'Active'},
  {id:'CU-1004',name:'Rohan Iyer',email:'rohan.i@example.com',mobile:'+91 99000 66778',joined:ago(28),status:'Active'},
];
export const businessStore = {
  read(key, fallback) { try { const v=localStorage.getItem(`fe-${key}`); return v?JSON.parse(v):fallback; } catch { return fallback; } },
  write(key, value) { localStorage.setItem(`fe-${key}`, JSON.stringify(value)); window.dispatchEvent(new Event('business-data')); return value; },
};
export const categories = ['Ingredients','Vegetables','Meat','Dairy','Gas','Electricity','Water','Rent','Staff Salaries','Delivery','Packaging','Marketing','Maintenance','Equipment','Other'];
export { foodItems };
