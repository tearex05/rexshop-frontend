import { useState, useEffect } from "react";
import { signIn } from "../api/index";
import { useNavigate,Link } from "react-router-dom";

function Signin() {
	const user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [disabled, setDisabled] = useState(false)
	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			setError("Plz fill all fields");
		} else {
			const userData = {
				"email": formData.email,
				"password": formData.password,
			};
			setError('Plz Wait...')
			setDisabled(true)
			signIn(userData)
				.then((res) => {
					localStorage.setItem("user", JSON.stringify(res?.data));
					setDisabled(false)
					setError("");
					navigate("/rexshop-frontend");
				})
				.catch((error) => {
					setError(error?.response.data);
					setDisabled(false)
				});
		}
	};
	useEffect(() => {
		if (user) {
			navigate("/rexshop-frontend");
		}
	}, [user]);
	return (
		<div className="signupin-wrapper">
		<div className="signupin-container">
		
			<form onSubmit={submitHandler} className="signupin">
			<h1 className="signupin-title">Signin</h1>
				<div className="input-container">
					<label htmlFor="email">Email:</label>
				<input
					value={formData.email}
					onChange={changeHandler}
					placeholder="Enter an email"
					id="email"
					type="email"
					className="input"
					name="email"
				/>
				</div>
				<div className="input-container">
					<label htmlFor="password">Password:</label>
				<input
					value={formData.password}
					onChange={changeHandler}
					placeholder="Enter a password"
					id="password"
					type="password"
					className="input"
					name="password"
				/>
				</div>
				{error && <p className="error">{error}</p>}
				<button disabled={disabled} type="submit" className="submit">
					Signin
				</button>
			</form>
			<p className="an-account">
				Don't Have An Account?
				<Link className="link-signupin" to="/rexshop-frontend/signup">
					Signup
				</Link>
			</p>
		</div>
		</div>
	);
}

export default Signin;
