import { memo } from 'react';
import type { Service } from '@/utils/types';

interface ServiceCatalogProps {
  services: Service[];
}

function ServiceCatalog(props: ServiceCatalogProps) {
  const { services } = props;

  const renderServiceData = (service: Service) => (
    <button
      key={service.id}
      className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all text-left"
    >
      <div className="text-4xl flex-shrink-0">{service.logo}</div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
        <span className="inline-block mt-2 text-xs text-primary-600 font-medium">
          {service.category}
        </span>
      </div>
    </button>
  )

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose a Service to Connect</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(renderServiceData)}
      </div>
    </div>
  );
}

export default memo(ServiceCatalog);
