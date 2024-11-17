export type ItemsType =
  | 'category'
  | 'product'
  | 'recipe'
  | 'recipe_list'
  | 'product_list'
  | 'query'
  | 'query_list';

export type Category = {
  attributes: {
    has_children: boolean;
    id: number;
    name: string;
    parent: number;
    parent_name: string;
    uri: string;
  };
  id: number;
  type: ItemsType;
};

export type Product = {
  attributes: {
    absolute_url: string;
    availability: {
      code: string;
      description: string;
      description_short: string;
      is_available: boolean;
    };
    brand: string;
    brand_id: number;
    client_classifiers: any[]; // Replace `any` with a specific type if you know the structure
    currency: string;
    discount: null | string; // Adjust if discount can have other types
    front_url: string;
    full_name: string;
    gross_price: string; // Use `number` if you want to parse it as a numeric value
    gross_unit_price: string; // Use `number` if you want to parse it as a numeric value
    id: number;
    images: {
      large: {
        height: number;
        url: string;
        width: number;
      };
      thumbnail: {
        height: number;
        url: string;
        width: number;
      };
      variant: string;
    }[];
    is_exempt_from_third_party_marketing: boolean;
    metadata: {
      is_sponsor_labeled: boolean;
      source_uuid: string;
    };
    name: string;
    name_extra: string;
    promotion: null | string; // Adjust if promotion can have other types
    promotions: any[]; // Replace `any` with a specific type if you know the structure
    unit_price_quantity_abbreviation: string;
    unit_price_quantity_name: string;
  };
  id: number;
  type: ItemsType;
};

export type RecipeList = {
  attributes: {
    display_name: string;
    items: number;
    name: string;
    navigate_to: string;
    total_items: number;
  };
  items: Recipe[];
  type: ItemsType;
};

export type Recipe = {
  attributes: {
    available_for_user_groups: UserGroup[];
    concept_icons: ConceptIcon[];
    cooking_duration_iso8601: string;
    cooking_duration_string: string;
    country: string;
    difficulty: string;
    difficulty_string: string;
    feature_image_url: string;
    front_url: string;
    id: number;
    is_liked_by_user: boolean | null;
    is_promoted: boolean;
    like_count: number;
    provider_name: string;
    slug_with_provider: string;
    tags: string[] | null;
    title: string;
    tracking_properties: any | null; // Replace `any` with a specific type if available
  };
  id: number;
  type: ItemsType;
};

type QueryAttributes = {
  query: string;
  request_type: string;
};

export type QueryItem = {
  attributes: QueryAttributes;
  id: number;
  type: string;
};

type QueryListAttributes = {
  display_name: string;
  items: number;
  name: string;
  navigate_to: null | string;
  total_items: number;
};

export type QueryList = {
  attributes: QueryListAttributes;
  items: QueryItem[];
  type: string;
};

interface QueryParam {
  filters: string;
  type: string;
}

export interface Filter {
  active: boolean;
  content_type: string;
  count: number;
  display_value: string;
  name: string;
  query_param: QueryParam;
  type: string;
  value: string;
}

interface UserGroup {
  name: string;
  user_type: number;
}

interface ConceptIcon {
  image_url: string;
  name: string;
}

export type ProductList = {
  attributes: {
    display_name: string;
    items: number;
    navigate_to: null;
    total_items: number;
  };
  filters: any;
  items: Product[];
  type: ItemsType;
};
export type DataType = {
  attributes: {
    filters: string;
    has_more_items: boolean;
    items: number;
    meta: null;
    page: number;
    query_string: string;
    request_types: any;
    uuid: string;
  };
  filters: Filter[];
  items: (Category | Product | Recipe | RecipeList | ProductList | QueryList)[];
};

export type SearchSettings = 'onlyProduct' | 'noFilter';
export type QuerySettings = 'query' | 'all' | 'filter';

export type SearchParametersType = {
  category: number | null;
  filters: string | null;
};
