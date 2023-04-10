import { Link } from 'react-router-dom';

import './404.css';

const Page404 = () => {
    return (
        <>
            <div className='error404'>
                <button>
                    <Link to='/'>
                        Back to page
                    </Link>
                </button>
            </div>
        </>
    )

}

export default Page404;