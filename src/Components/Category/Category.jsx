// components/Category.jsx
import React from "react";
import { categoryFullInfos} from "./categoryFullInfos";
import CategoryCard from "./CategoryCard";
import styles from "./category.module.css";

function Category() {
  return (
    <section className={styles.catagory__container}>
      {categoryFullInfos.map((item, index) => (
        <CategoryCard key={index} data={item} />
      ))}
    </section>
  );
}

export default Category;