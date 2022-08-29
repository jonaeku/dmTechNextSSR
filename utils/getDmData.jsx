const spfCalculator = (highestUvi) => {
  if (highestUvi <= 3) {
    return "Niedriger%20Schutz%20(6-10)";
  }
  if (highestUvi <= 5) {
    return "Mittlerer%20Schutz%20(15-25)";
  }
  if (highestUvi <= 7) {
    return "Hoher%20Schutz%20(30-50)";
  } else {
    return "Sehr%20hoher%20Schutz%20(50%2B)";
  }
};

export const getProductData = async (highestUvi) => {
  const res = await fetch(
    `https://product-search.services.dmtech.com/de/search/crawl?query=sonnencreme&searchType=product&sunProtectionFactorRange=${spfCalculator(
      highestUvi
    )}&type=search&brandName=SUNDANCE&brandName=babylove&pageSize=5`
  );
  const productData = await res.json();
  
  return productData
};
