import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Truck, Award, Shield, Clock, Star, Share2, Heart } from 'lucide-react';
import { products } from '../data/products';
import { OrderForm } from '../components/product/OrderForm';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { ProductImages } from '../components/product/ProductImages';

export const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedGauge, setSelectedGauge] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const product = products.find(p => p.id === id);

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-32 text-center">
      <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
      <p className="mb-8">The product you are looking for does not exist or has been removed.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
        Back to Home
      </Link>
    </div>
  );

  const total = product.price * quantity;

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Child animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const handleSubmit = () => {
    // Here you would typically handle the order submission, 
    // but for this example we'll just open WhatsApp
    const message = encodeURIComponent(
      `Hello, I'm interested in ordering ${product.name}:\n\nQuantity: ${quantity}\n${selectedGauge ? `Gauge: ${selectedGauge}\n` : ''}${selectedFinish ? `Finish: ${selectedFinish}\n` : ''}Total: KSh ${total.toFixed(2)}`
    );
    window.open(`https://wa.me/+254755139294?text=${message}`, '_blank');
  };

  return (
    <motion.div 
      className="pt-32 pb-20" // Added top padding to account for fixed header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <motion.div className="max-w-7xl mx-auto px-4 mb-16" variants={itemVariants}>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Column - Product Images */}
            <motion.div 
              className="p-6 bg-gray-50"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductImages product={product} />
            </motion.div>

            {/* Right Column - Product Info and Order Form */}
            <motion.div 
              className="p-8 flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Product Header with Favorite button */}
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart 
                    className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                  />
                </button>
              </div>

              {/* Price and Rating */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-blue-700">KSh {product.price.toFixed(2)}</span>
                  {/* Simulating a sale price - can be added to product model in the future */}
                  {Math.random() > 0.5 && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      KSh {(product.price * 1.2).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">(24 reviews)</span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Benefits Section */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Truck className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm">Free Delivery</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm">Quality Guaranteed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Award className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm">Certified Products</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm">Fast Installation</span>
                </div>
              </div>

              {/* Order Form */}
              <OrderForm
                productName={product.name}
                specifications={product.specifications}
                selectedGauge={selectedGauge}
                selectedFinish={selectedFinish}
                quantity={quantity}
                total={total}
                onGaugeChange={setSelectedGauge}
                onFinishChange={setSelectedFinish}
                onQuantityChange={setQuantity}
                onSubmit={handleSubmit}
              />

              {/* Share Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button 
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  onClick={() => navigator.share?.({
                    title: product.name,
                    text: product.description,
                    url: window.location.href
                  }).catch(err => console.log(err))}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share this product
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Product Tabs */}
      <motion.div className="max-w-7xl mx-auto px-4 mb-16" variants={itemVariants}>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              {['description', 'specifications', 'reviews'].map(tab => (
                <button
                  key={tab}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Product Description</h3>
                <p className="text-gray-600">
                  {product.description} Our premium roofing materials are designed to withstand harsh weather conditions while providing excellent durability and aesthetic appeal. Each product undergoes rigorous quality control to ensure it meets our high standards.
                </p>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Exceptional durability and weather resistance</li>
                      <li>Advanced corrosion protection technology</li>
                      <li>Easy installation and maintenance</li>
                      <li>Energy efficient design</li>
                      <li>Environment-friendly manufacturing process</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Applications</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Residential buildings</li>
                      <li>Commercial properties</li>
                      <li>Industrial facilities</li>
                      <li>Agricultural structures</li>
                      <li>Educational institutions</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Material</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Galvanized Steel with Zinc Coating</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Thickness</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.4mm - 0.55mm</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Coating</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">AZ150 (150g/m²)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Standard Length</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Custom cut to length (1m - 12m)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Warranty</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15-25 years (depending on environment)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                    Write a Review
                  </button>
                </div>
                
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`w-4 h-4 ${j < 5 - i % 2 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <h4 className="font-medium text-gray-900">John Doe</h4>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">3 months ago</span>
                      </div>
                      <p className="text-gray-600">
                        Great product! We installed this on our new house and couldn't be happier with the quality and appearance. The installation was straightforward and the customer service team was very helpful when we had questions.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Related Products Section */}
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto px-4">
        <RelatedProducts currentProductId={product.id} products={products} />
      </motion.div>
    </motion.div>
  );
};