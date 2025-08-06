import {
  CatalogVisibilityProduct,
  CategoryProduct,
  DimensionProduct,
  ImageProduct,
  Product,
  StatusProduct,
  TypeProduct,
} from '../interfaces/product.interface';

export class ProductDto implements Product {
  id: 794;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: TypeProduct;
  status: StatusProduct;
  featured: boolean;
  catalog_visibility: CatalogVisibilityProduct;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  external_url: string;
  button_text: string;
  tax_status: 'taxable' | 'shipping' | 'none';
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: null | number;
  stock_status: 'instock' | 'outstock';
  backorders: 'no' | 'yes';
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  dimensions: DimensionProduct;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: CategoryProduct[];
  images: ImageProduct[];
  menu_order: number;
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
  };
}
