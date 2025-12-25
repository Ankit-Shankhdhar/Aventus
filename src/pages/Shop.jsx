import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/Shop.module.css";
import {
  Search,
  Filter,
  ShoppingCart,
} from "lucide-react";

export default function Shop() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState("all");

  React.useEffect(() => {
    let mounted = true;
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("no-api");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        // Adapt API response
        const adaptedData = data.products ? data.products.map(product => ({
          _id: product._id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          inStock: product.inStock,
          initial: product.name ? product.name.charAt(0) : "",
          featured: product.featured || false,
        })) : [];
        setProducts(adaptedData);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        if (!mounted) return;
        setProducts([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const filtered = products.filter((p) => {
    const q = query.trim().toLowerCase();
    if (q && !p.name.toLowerCase().includes(q)) return false;
    if (filter === "apparel") return p.category?.toLowerCase() === "apparel";
    if (filter === "accessories") return p.category?.toLowerCase() === "accessories";
    if (filter === "gear") return p.category?.toLowerCase() === "gear";
    return true;
  });

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.heroGlow} />
      <div className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Official <span className={styles.highlight}>Merch</span>
          </h1>
          <p className={styles.subtitle}>
            Rep Team Aventus with our official merchandise. Premium quality gear for true fans.
          </p>
        </section>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterWrap}>
          <Filter size={18} className={styles.filterIcon} />
          <button
            className={`${styles.pill} ${filter === "all" ? styles.pillActive : ""}`}
            onClick={() => setFilter("all")}
            type="button"
          >
            All
          </button>
          <button
            className={`${styles.pill} ${filter === "apparel" ? styles.pillActive : ""}`}
            onClick={() => setFilter("apparel")}
            type="button"
          >
            Apparel
          </button>
          <button
            className={`${styles.pill} ${filter === "accessories" ? styles.pillActive : ""}`}
            onClick={() => setFilter("accessories")}
            type="button"
          >
            Accessories
          </button>
          <button
            className={`${styles.pill} ${filter === "gear" ? styles.pillActive : ""}`}
            onClick={() => setFilter("gear")}
            type="button"
          >
            Gear
          </button>
        </div>

        <div className={styles.productCount}>
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        </div>
      </div>

      <section className={styles.gridSection}>
        {loading ? (
          <div className={styles.loading}>Loading products...</div>
        ) : filtered.length === 0 ? (
          <div className={styles.loading}>No products found.</div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((p) => (
              <article
                key={p._id || p.slug}
                className={`${styles.card} ${p.featured ? styles.cardFeatured : ""}`}
                aria-label={p.name}
              >
                {!p.inStock && (
                  <div className={styles.outOfStock}>OUT OF STOCK</div>
                )}
                
                <div className={styles.cardTop}>
                  <div className={styles.initial}>{p.initial}</div>
                  <span className={styles.typeBadge}>{p.category?.toUpperCase() || 'PRODUCT'}</span>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.name}>{p.name}</h3>
                  
                  <p className={styles.description}>
                    {p.description}
                  </p>

                  <div className={styles.priceRow}>
                    <span className={styles.price}>₹{p.price.toFixed(2)}</span>
                    <button 
                      className={styles.addButton} 
                      disabled={!p.inStock}
                      aria-label={`Add ${p.name} to cart`}
                    >
                      <ShoppingCart size={16} />
                      <span>ADD</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
