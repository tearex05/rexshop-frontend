import { useState, useEffect } from "react";
import FileBase64 from "react-file-base64";
import { updateItem, getItem, deleteItem } from "../api/index";
import { useParams, useNavigate } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

function UpdateItem() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [disabled, setDisabled] = useState(false);
	const [item, setItem] = useState({
		name: "",
		price: "",
		picture: "",
	});
	useEffect(() => {
		getItem(id).then((res) => {
			setLoading(false);
			setItem(res.data);
		});
	}, [id]);
	const changeHandler = (e) => {
		setItem({ ...item, [e.target.name]: e.target.value });
	};
	let user = JSON.parse(localStorage.getItem("user"));

	const submitHandler = (e) => {
		e.preventDefault();
		if (!item.name || !item.price || !item.picture) {
			setError("Plz fill all fields");
		} else {
			const itemData = {
				name: item.name,
				price: item.price,
				picture: item.picture,
			};
			setError('Plz Wait...')
			setDisabled(true);
			updateItem(id, itemData).then(() => {
				setError("");
				setDisabled(false);
				navigate("/rexshop-frontend");
			});
		}
	};
	if (loading) {
		return (
			<div className="loading-container">
				<MdShoppingCart className='loading' color='#00D398' size='4em' />
			</div>
		);
	}
	return (
		<div className="update-item-container">
			<form className="update-item">
				<h1 className="update-item-title">Update your item</h1>
				<div className="input-container">
					<label htmlFor="name">Name:</label>
					<input
						id="name"
						value={item.name}
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
						id="price"
						onChange={changeHandler}
						value={item.price}
						name="price"
						placeholder="Item's Price"
						type="number"
						className="input"
					/>
				</div>
				<div className="img-input">
					<FileBase64
						multiple={false}
						onDone={(e) => setItem({ ...item, picture: e.base64 })}
					/>
				</div>
				<p className="error">{error}</p>
				<button
					disabled={disabled}
					className="submit"
					onClick={submitHandler}
				>
					Edit
				</button>
				<button
					disabled={disabled}
					onClick={() => {
						deleteItem(item._id);
						navigate("/rexshop-frontend");
					}}
					className="delete submit"
				>
					Delete
				</button>
			</form>
		</div>
	);
}

export default UpdateItem;
