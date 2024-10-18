import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface FilterModalProps {
  isVisible: boolean;
  onApply: (selectedStatus: string | null) => void;
  setIsVisible: (visible: boolean) => void;
  statuses: [];
}

const FilterModal: React.FC<FilterModalProps> = ({
  onApply,
  isVisible,
  setIsVisible,
  statuses,
}) => {
  const [selectedStatus, setSelectedStatus] = useState([]);

  const onClose = () => {
    setSelectedStatus([]);
    setIsVisible(false);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={{
              width: 30,
              height: 5,
              backgroundColor: Colors.sec,
              borderRadius: 4,
              alignSelf: 'center',
              marginTop: 4,
            }}
            onPress={() => setIsVisible(false)}
          ></TouchableOpacity>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => onApply(selectedStatus)}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.label}>SHIPMENT STATUS</Text>
            <View style={styles.statusList}>
              {statuses.map((status) => (
                <TouchableOpacity
                  key={status.name}
                  style={[
                    styles.statusTag,
                    selectedStatus?.includes(status.name) && styles.selectedTag,
                  ]}
                  onPress={() =>
                    setSelectedStatus((prev) =>
                      prev?.includes(status.name)
                        ? prev.filter((s) => s !== status.name)
                        : [...prev, status.name]
                    )
                  }
                >
                  <Text
                    style={[
                      styles.statusText,
                      selectedStatus?.includes(status.name) &&
                        styles.selectedText,
                    ]}
                  >
                    {status.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingHorizontal: 16,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.pri,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doneText: {
    fontSize: 16,
    color: Colors.pri,
  },
  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    color: '#A8A6A7',
    marginBottom: 10,
  },
  statusList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusTag: {
    backgroundColor: Colors.banner,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 14,
    color: Colors.sec,
  },
  selectedTag: {
    borderColor: Colors.pri,
  },
  selectedText: {
    color: Colors.pri,
  },
});
