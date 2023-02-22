import { Link, useNavigate } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

function Nav() {
	const itemsInCart = useSelector((state) => state.itemReducer);
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));
	const onLogout = () => {
		localStorage.removeItem("user");
		navigate("/rexshop-frontend");
	};
	return (
		<div className="nav">
			<Link to="/rexshop-frontend" className="home-link">
				RexShop
			</Link>
			{user ? (
				<div className="account-link-dropdown">
					<p className="username">{user.username}</p>
					<div className="dropdown-content">
						<Link to="/rexshop-frontend/cart" className="link">
							Items In Cart
						</Link>
						<Link className="link" to="/rexshop-frontend/createitem">
							+ Create Item
						</Link>
						<button onClick={onLogout} className="logout">
							Logout
						</button>
					</div>
					<div className="cart">
						<MdShoppingCart className='cart-icon' size='2em' />
						<span className="items-in-cart">
							{itemsInCart.length}
						</span>
					</div>
				</div>
			) : (
				<div className="account-links">
					<Link className="signup-link" to="/rexshop-frontend/signup">
						Signup
					</Link>
					<span> | </span>
					<Link className="signin-link" to="/rexshop-frontend/signin">
						Signin
					</Link>
				</div>
			)}
		</div>
	);
}

export default Nav;
