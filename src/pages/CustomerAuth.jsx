import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CustomerAuth({ register = false }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return <section className="container page-shell section-space"><div className="auth-card"><span className="eyebrow small">FoodExpress account</span><h1>{register ? 'Create your account' : 'Welcome back'}</h1><p>{register ? 'Save your favourites and keep every order close.' : 'Sign in to check your orders and saved favourites.'}</p><form onSubmit={e=>{e.preventDefault();const form=e.currentTarget;const fields=form.querySelectorAll('input');if(register&&fields[3].value!==fields[4].value){setError('Passwords do not match.');return}setError('');setLoading(true);const customer={name:form.elements.fullName?.value||'Customer',email:form.elements.email.value,mobile:form.elements.mobile?.value||'',createdAt:new Date().toISOString()};setTimeout(()=>{setLoading(false);localStorage.setItem('foodexpress-customer',JSON.stringify(customer));navigate('/profile')},450)}}>
    {register&&<><label>Full name</label><input name="fullName" required placeholder="Your name"/></>}
    <label>Email address</label><input name="email" required type="email" placeholder="you@example.com"/>
    {register&&<><label>Mobile number</label><input name="mobile" required type="tel" placeholder="+91 98765 43210" pattern="[+0-9() -]{8,}"/></>}
    <label>Password</label><div className="auth-password"><input name="password" required type={show?'text':'password'} minLength="6" placeholder="At least 6 characters"/><button type="button" onClick={()=>setShow(!show)}>{show?'Hide':'Show'}</button></div>
    {register&&<><label>Confirm password</label><input required type={show?'text':'password'} minLength="6" placeholder="Enter password again"/></>}
    {!register&&<label className="auth-remember"><input type="checkbox"/> Remember me</label>}
    {error&&<p className="success-message">{error}</p>}<button className="primary-btn full-width" disabled={loading}>{loading?'Please wait…':register?'Create account':'Sign in'}</button>
  </form><div className="auth-switch">{register?'Already have an account?':'New to FoodExpress?'} <Link to={register?'/customer/login':'/customer/register'}>{register?'Sign in':'Create account'}</Link></div>{!register&&<a className="auth-forgot" href="mailto:support@foodexpress.example?subject=Password%20reset">Forgot password?</a>}</div></section>;
}
