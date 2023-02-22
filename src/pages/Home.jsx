import { useState, useEffect } from "react";
import { getItems } from "../api/index";
import Item from "../components/Item";
import Masonry from "react-masonry-css";
import { MdShoppingCart } from "react-icons/md";


function Home() {
	const [allItems, setAllItems] = useState([]);
	const [itemSearchedFor, setItemSearchedFor] = useState("");
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getItems()
			.then(res => {
				setLoading(false)
				setAllItems(res.data)
			})
	}, [allItems, loading]);
	
	const breakpointColumnsObj = {
		3500: 3,
		2000: 3,
		1199: 2,
		900: 1,
	};
	if (loading) {
		return (
			<div className="loading-container">
				<MdShoppingCart className='loading' color='#00D398' size='4em' />
			</div>
		);
	}
	return (
		<>
			<div className="home-wrapper">
				<input
					value={itemSearchedFor}
					onChange={(e) => setItemSearchedFor(e.target.value)}
					placeholder="Search For Items"
					type="text"
					className="search"
				/>
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{allItems.filter(item => {
						if(itemSearchedFor === ''){
							return item
						} else if (item.name.toLowerCase().includes(itemSearchedFor.toLowerCase())){
								return item
						}
					}).map(item => (
						<Item key={item._id} item={item} />
					))}
				</Masonry>
			</div>
		</>
	);
}

export default Home;
