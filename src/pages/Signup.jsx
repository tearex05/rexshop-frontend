import { useState, useEffect } from "react";
import { signUp } from "../api/index";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
	const user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const [error, setError] = useState("");
	const [disabled, setDisabled] = useState(false)
	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (
			!formData.name ||
			!formData.email ||
			!formData.password ||
			!formData.password2
		) {
			setError("Plz fill all fields");
		} else if (formData.password !== formData.password2) {
			setError("Passwords don't match");
		} else {
			const userData = {
				name: formData.name,
				email: formData.email,
				password: formData.password,
			};
			setError('Plz Wait...')
			setDisabled(true)
			signUp(userData)
				.then((res) => {
					localStorage.setItem("user", JSON.stringify(res.data));
					setDisabled(false)
					setError("");
					navigate("/rexshop-frontend");
				})
				.catch((error) => {
					setError(error.response.data);
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
				<h1 className="signupin-title">Signup</h1>
				<div className="input-container">
					<label htmlFor="username">Username:</label>
					<input
						value={formData.name}
						onChange={changeHandler}
						placeholder="Enter a username"
						id="username"
						type="text"
						className="input"
						name="name"
					/>
				</div>
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
				<div className="input-container">
					<label htmlFor="password2">Confirm your password:</label>
					<input
						value={formData.password2}
						onChange={changeHandler}
						placeholder="ReEnter your password"
						id="password2"
						type="password"
						className="input"
						name="password2"
					/>
				</div>
				{error && <p className="error">{error}</p>}
				<button disabled={disabled} type="submit" className="submit">
					Signup
				</button>
			</form>
			<p className="an-account">
				Already Have An Account?{" "}
				<Link className="link-signupin" to="/rexshop-frontend/signin">
					Signin
				</Link>
			</p>
		</div>
		</div>
	);
}

export default Signup;
