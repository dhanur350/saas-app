
export interface Tenant {
  id: string;
  name: string;
  abbreviation: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
}

export interface Connection {
  id: string;
  integration: string;
  name: string;
  source: string;
  entityGroup: string;
  interval: string;
  connectorUrl: string;
  instructions: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  children?: NavigationItem[];
}

export interface ModalState {
  isOpen: boolean;
  type: 'edit' | 'delete' | null;
  data: Connection | null;
}
