import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemedView } from '@/components/ThemedView';
import Constants from 'expo-constants';
import { Colors } from '@/constants/Colors';
import {
  Ionicons,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  EvilIcons,
} from '@expo/vector-icons';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import {
  getShipments,
  getShipmentStatuses,
} from '@/services/shipments.service';
import { getStatusColor, getStatusTextColor } from '@/utils/statusColor';
import FilterModal from '@/components/FilterModal';
import { useGlobalContext } from '@/store/context';
import Checkbox from 'expo-checkbox';

interface ShipmentItem {
  barcode: string;
  origin_city: string;
  destination_city: string;
  status: string;
}

const index = () => {
  const { currentUser } = useGlobalContext();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filter, setFilter] = useState([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      try {
        const response = await getShipments();
        setShipments(response);
      } catch (error) {
        console.error('Error fetching shipments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  useEffect(() => {
    async function fetchStatuses() {
      try {
        const response = await getShipmentStatuses();
        setStatuses(response);
      } catch (error) {
        console.error('Failed to fetch shipment statuses:', error);
      }
    }
    fetchStatuses();
  }, []);

  const onSearch = async () => {
    setLoading(true);
    try {
      const response = await getShipments({ barcode: searchText });
      setShipments(response);
    } catch (error) {
      console.error('Error fetching shipments by barcode:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterButton = async () => {
    if (filter.length < 1) {
      setOpenFilterModal(true);
    } else {
      setFilter([]);
      const response = await getShipments();
      setShipments(response);
    }
  };

  const onApply = async (selectedStatuses: any) => {
    setFilter(selectedStatuses);
    setOpenFilterModal(false);
    setLoading(true);

    try {
      const response = await getShipments({ status: selectedStatuses });
      console.log('response', response);
      setShipments(response);
    } catch (error) {
      console.error('Error fetching filtered shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCheckbox = (itemBarcode: string) => {
    setCheckedItems((prev) => {
      if (!prev.includes(itemBarcode)) {
        return [...prev, itemBarcode];
      } else {
        return prev.filter((barcode) => barcode !== itemBarcode);
      }
    });
  };

  const renderShipmentItem = ({ item }) => {
    return (
      <View style={styles.shipmentContainer}>
        <Checkbox
          style={styles.checkbox}
          value={checkedItems.includes(item.barcode)}
          onValueChange={() => toggleCheckbox(item.barcode)}
          color={checkedItems.includes(item.barcode) ? Colors.pri : undefined}
        />
        <Image
          source={require('@/assets/images/shippment-box.png')}
          style={{ width: 30, height: 30 }}
        />
        <View style={styles.shipmentDetails}>
          <Text style={{ fontFamily: 'ir', fontSize: 13 }}>AWB</Text>
          <Text style={styles.barcodeText}>{item.barcode}</Text>
          <Text style={[styles.locationText, { textTransform: 'capitalize' }]}>
            {item.origin_city} → {item.destination_city}
          </Text>
        </View>

        <View
          style={{ columnGap: 12, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text
            style={[
              {
                backgroundColor: getStatusColor(item.status, statuses),
                color: getStatusTextColor(item.status, statuses),
                fontSize: 11,
                fontFamily: 'im',
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 4,
              },
            ]}
          >
            {item.status}
          </Text>

          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <AntDesign name="arrowsalt" size={16} color={Colors.pri} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      <ThemedView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
          backgroundColor: 'white',
        }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.base,
                borderRadius: 100,
              }}
            >
              <FontAwesome name="user-o" size={24} color="black" />
            </View>
            <Image
              source={require('@/assets/images/logo-blue.png')}
              style={styles.logo}
            />
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.base,
                borderRadius: 100,
              }}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={Colors.pri}
              />
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.username}>{currentUser?.full_name}</Text>
          </View>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', columnGap: 6 }}
          >
            <View style={{ flex: 1 }}>
              <InputField
                label="Search"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            <View
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#E5E5E5',
                backgroundColor: Colors.base,
                marginBottom: 20,
                borderRadius: 10,
              }}
            >
              <EvilIcons
                name="search"
                size={30}
                color="black"
                onPress={onSearch}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={filter.length > 0 ? 'Clear Filter' : 'Filters'}
              onPress={handleFilterButton}
              color={Colors.base}
              textColor={Colors.sec}
              icon={
                filter.length > 0 ? (
                  <MaterialIcons name="clear" size={20} color={Colors.sec} />
                ) : (
                  <Ionicons name="filter" size={20} color={Colors.sec} />
                )
              }
              styleOverride={{
                paddingVertical: 10,
                flex: 1,
                borderRadius: 10,
              }}
              textStyleOverride={{
                fontFamily: 'ir',
              }}
            />
            <Button
              title="Add Scan"
              onPress={() => console.log('Scan pressed')}
              color={Colors.pri}
              textColor="#ffffff"
              icon={
                <MaterialCommunityIcons
                  name="line-scan"
                  size={20}
                  color="#ffffff"
                />
              }
              styleOverride={{
                paddingVertical: 10,
                flex: 1,
                borderRadius: 10,
              }}
              textStyleOverride={{
                fontFamily: 'ir',
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.sectionTitle}>Shipments</Text>
            <View style={styles.markAllContainer}>
              <Checkbox style={styles.checkbox} color={undefined} />
              <Text style={styles.markAllText}>Mark All</Text>
            </View>
          </View>

          {loading ? (
            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size="large" color={Colors.pri} />
            </View>
          ) : (
            <FlatList
              data={shipments}
              renderItem={renderShipmentItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
        <FilterModal
          isVisible={openFilterModal}
          setIsVisible={setOpenFilterModal}
          onApply={onApply}
          statuses={statuses}
        />
      </ThemedView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },
  logo: {
    width: 92.28,
    height: 16,
    resizeMode: 'contain',
  },
  greeting: {
    fontSize: 14,
    color: Colors.sec,
    marginBottom: 2,
    fontFamily: 'ir',
  },
  username: {
    fontSize: 28,
    fontFamily: 'isb',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'isb',
    color: Colors.pri,
    marginBottom: 10,
  },
  markAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  markAllText: {
    marginLeft: 5,
    color: Colors.pri,
    fontSize: 18,
    fontFamily: 'ir',
  },
  shipmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F2F8',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  shipmentDetails: {
    flex: 1,
    marginLeft: 10,
  },
  barcodeText: {
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'isb',
    fontSize: 18,
  },
  locationText: {
    color: '#7A7A7A',
    fontSize: 13,
    fontFamily: 'ir',
  },
  statusBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    width: 72,
    height: 23,
  },
  checkbox: {
    margin: 8,
    borderRadius: 2,
    width: 14,
    height: 14,
  },
});
