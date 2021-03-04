export default interface Filter {
  'name-like'?: string[];
  priority?: number[];
  'workbasket-id'?: string[];
  domain?: string[];
  'owner-like'?: string[];
  'por.type'?: string[];
  'por.value'?: string[];
  'sort-by': 'CLASSIFICATION_KEY' | 'POR_TYPE' | 'POR_VALUE' | 'STATE' | 'NAME' | 'DUE' | 'PLANNED' | 'PRIORITY';
  order: 'ASCENDING' | 'DESCENDING';
}
