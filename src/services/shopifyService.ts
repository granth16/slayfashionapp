import axios from 'axios';
import {SHOPIFY_CONFIG} from '../config/shopify';

const shopifyClient = axios.create({
  baseURL: `https://${SHOPIFY_CONFIG.storeDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
  },
});

const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          productType
        }
      }
    }
  }
`;

const PRODUCTS_BY_TYPE_QUERY = `
  query getProductsByType($first: Int!, $query: String!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          productType
        }
      }
    }
  }
`;

export interface ShopifyProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images: string[];
}

export const fetchAllProducts = async (): Promise<ShopifyProduct[]> => {
  try {
    const response = await shopifyClient.post('', {
      query: PRODUCTS_QUERY,
      variables: {first: 50},
    });

    const products = response.data.data.products.edges.map((edge: any) => {
      const allImages = edge.node.images.edges.map((img: any) => img.node.url);
      return {
      id: edge.node.id,
      name: edge.node.title,
      description: edge.node.description?.substring(0, 50) || 'Premium quality',
      price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
      category: edge.node.productType || 'Others',
        image: allImages[0] || 'https://via.placeholder.com/400x500',
        images: allImages.length > 0 ? allImages : ['https://via.placeholder.com/400x500'],
      };
    });

    return products;
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return [];
  }
};

export const fetchProductsByCategory = async (
  category: string,
): Promise<ShopifyProduct[]> => {
  try {
    const response = await shopifyClient.post('', {
      query: PRODUCTS_BY_TYPE_QUERY,
      variables: {
        first: 50,
        query: `product_type:${category}`,
      },
    });

    const products = response.data.data.products.edges.map((edge: any) => {
      const allImages = edge.node.images.edges.map((img: any) => img.node.url);
      return {
      id: edge.node.id,
      name: edge.node.title,
      description: edge.node.description?.substring(0, 50) || 'Premium quality',
      price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
      category: edge.node.productType || 'Others',
        image: allImages[0] || 'https://via.placeholder.com/400x500',
        images: allImages.length > 0 ? allImages : ['https://via.placeholder.com/400x500'],
      };
    });

    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

