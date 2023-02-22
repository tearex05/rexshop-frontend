import {Link} from 'react-router-dom'

function Successful() {
	return (
		<div className="successful">
			<p className="successful-text">
				The purchase was successful
			</p>
			<Link className='submit blue' to='/rexshop-frontend'>home page</Link>
		</div>
	)
}

export default Successful