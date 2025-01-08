import './ProductOverview.css';


const ProductOverview = ({ data }) => {

  return (
    <div className="container product-container">
      <img className="product-img" src={data.image} alt="product"/>
      <h3>{data.title}</h3>
      <p className='product-subtitle'>{data.subtitle}</p>
      <div className="foo">
        <div className="product-tag-container">
          {
            data?.tags.map((tag, idx) => {
              return (
                <div 
                key={tag + idx}
                className="product-tags"
                >
                  {tag}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ProductOverview