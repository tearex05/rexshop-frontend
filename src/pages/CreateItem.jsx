import { useState } from "react";
import FileBase64 from "react-file-base64";
import { createItem } from "../api/index";
import { useNavigate, Link } from "react-router-dom";

function CreateItem() {
	let user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [disabled, setDisabled] = useState(false)
	const [data, setData] = useState({
		name: "",
		price: "",
		picture: "",
		creator: "",
	});
	const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (!data.name || !data.price || !data.picture) {
			setError("Plz fill all fields");
		} else {
			const itemData = {
				name: data.name,
				price: data.price,
				picture: data.picture,
				creator: user.id,
			};
			setError('This page is down for now \n sorry')
			setDisabled(true)
			/*createItem(itemData).then(() => {
				setError('')
				setDisabled(false)
				navigate("/rexshop-frontend")
			});*/
		}
	};
	if (!user) {
		return (
			<div className="not-user-container">
				<p className="not-user">
				Plz{" "}
				<Link className="signup-link" to="/rexshop-frontend/signup">
					Signup
				</Link>
				{" "}or{" "}
				<Link className="signin-link" to="/rexshop-frontend/signin">
					Signin
				</Link>
				{" "}to create a item
			</p>
			</div>
		);
	}
	return (
		<div className="create-item-container">
			<form className="create-item">
			<h1 className="create-item-title">
				Your Product's Info:
			</h1>
				<div className="input-container">
				<label htmlFor="name">Name:</label>
					<input
					id='name'
					value={data.name}
					name="name"
					onChange={changeHandler}
					placeholder="Item's Name"
					type="text"
					className="input"
				/>
				</div>
				<div className="input-container">
				<label htmlFor="price">Price:</label>
					<input
					id='price'
					onChange={changeHandler}
					value={data.price}
					name="price"
					placeholder="Item's Price"
					type="number"
					className="input"
				/>
				</div>
				<div className="img-input">
					<FileBase64
					multiple={false}
					onDone={(e) => setData({ ...data, picture: e.base64 })}
				/>
				</div>
				<p className="error">{error}</p>
				<button disabled={disabled} type='submit' className="submit" onClick={submitHandler}>
					Submit
				</button>
			</form>
		</div>
	);
}

export default CreateItem;
