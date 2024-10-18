interface Filter {
  name?: string;
  status?: string;
  [key: string]: any;
}

interface Shipment {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  idx: number;
  sender: string;
  origin_city: string;
  sender_name: string;
  origin_country: string;
  destination_city: string;
  destination_country: string;
  status: string;
  barcode: string;
  service: string;
  total_weight: number;
  company: string;
  pieces: number;
}

export const getShipments = async (
  filter: Filter = {}
): Promise<Shipment[]> => {
  const url = `${process.env.EXPO_PUBLIC_BASE_URL}/frappe.client.get_list`;

  const filters = {
    ...filter,
    status: filter.status ? ['in', filter.status] : undefined,
    barcode: filter.searchTerm ? ['like', `%${filter.searchTerm}%`] : undefined,
  };

  const params = new URLSearchParams({
    doctype: 'AWB',
    fields: JSON.stringify(['*']),
    filters: JSON.stringify(filters),
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.message as Shipment[];
  } catch (error) {
    console.error('Error fetching shipments:', error);
    throw error;
  }
};

export const getShipmentStatuses = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/frappe.client.get_list?doctype=AWB%20Status&fields=["*"]`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching shipment statuses. Status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log({ data });
    return data.message;
  } catch (error) {
    console.error('Error fetching shipment statuses:', error);
    return [];
  }
};
