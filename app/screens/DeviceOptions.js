import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import user from 'models/user';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';

const typesDict = {
  desktop: 'Desktop',
  steam_deck: 'Steam Deck',
  new: 'Novo Dispositivo',
};

export default function ({ navigation, route }) {
  const [device, setDevice] = useState(route.params);
  const [editingDevice, setEditingDevice] = useState(device);
  const [isEditing, setIsEditing] = useState(device.type === 'new');

  const deviceTypeOptions = [
    { title: 'Desktop', icon: 'desktop-outline', slug: 'desktop' },
    { title: 'Steam Deck', icon: 'phone-landscape-sharp', slug: 'steam_deck' },
  ];

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  function handleDiscard() {
    setEditingDevice(device);
    setIsEditing(!isEditing);
    if (device.type === 'new') {
      navigation.goBack();
    }
  }

  function Header() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Ionicons name="arrow-back-outline" size={35} />
        </TouchableOpacity>
        <Text style={styles.title}>
          {!isEditing ? typesDict[device.type] : typesDict[editingDevice.type]}
        </Text>
      </View>
    );
  }

  if (isEditing) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={navigation.goBack}
          >
            <Ionicons name="arrow-back-outline" size={35} />
          </TouchableOpacity>
          <Text style={styles.title}>{typesDict[editingDevice.type]}</Text>
        </View>
        <View style={[styles.infoContainer, { alignItems: 'center' }]}>
          <TextInput
            value={editingDevice.distro}
            style={styles.input}
            placeholder="Distro Linux"
            onChangeText={(text) =>
              setEditingDevice({ ...editingDevice, distro: text })
            }
          />
          <TextInput
            value={editingDevice.kernel}
            style={styles.input}
            placeholder="Versão do Kernel"
            onChangeText={(text) =>
              setEditingDevice({ ...editingDevice, kernel: text })
            }
          />
          <TextInput
            value={editingDevice.cpu}
            style={styles.input}
            placeholder="CPU"
            onChangeText={(text) =>
              setEditingDevice({ ...editingDevice, cpu: text })
            }
          />
          <TextInput
            value={editingDevice.gpu}
            style={styles.input}
            placeholder="GPU"
            onChangeText={(text) =>
              setEditingDevice({ ...editingDevice, gpu: text })
            }
          />
          <TextInput
            value={editingDevice.gpu_driver}
            style={styles.input}
            placeholder="Driver da GPU"
            onChangeText={(text) =>
              setEditingDevice({ ...editingDevice, gpu_driver: text })
            }
          />
          <TextInput
            value={editingDevice.ram}
            style={styles.input}
            placeholder="RAM"
            onChangeText={(text) =>
              setEditingDevice({ ...editingDevice, ram: text })
            }
          />
          <SelectDropdown
            data={deviceTypeOptions}
            onSelect={(selectedItem, index) =>
              setEditingDevice({ ...editingDevice, type: selectedItem.slug })
            }
            renderButton={(selectedItem, isOpened) => {
              if (editingDevice.type !== 'new') {
                const optionIndex = deviceTypeOptions.findIndex(
                  (obj) => obj.slug == editingDevice.type
                );
                selectedItem = deviceTypeOptions[optionIndex];
              }
              return (
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem && (
                    <Ionicons name={selectedItem.icon} size={20} />
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) ||
                      'Tipo de dispositivo'}
                  </Text>
                  <Ionicons
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    size={20}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && {}),
                  }}
                >
                  <Ionicons name={item.icon} size={20} />
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
        <View style={styles.actionsContainer}>
          <View style={{ flex: 1 }}>
            <Button title="Salvar" />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Descartar" onPress={handleDiscard} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Ionicons name="arrow-back-outline" size={35} />
        </TouchableOpacity>
        <Text style={styles.title}>{typesDict[editingDevice.type]}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text>Distro Linux: {device.distro}</Text>
        <Text>Versão do Kernel: {device.kernel}</Text>
        <Text>CPU: {device.cpu}</Text>
        <Text>GPU: {device.gpu}</Text>
        <Text>Driver da GPU: {device.gpu_driver}</Text>
        <Text>RAM: {device.ram}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <View style={{ flex: 1 }}>
          <Button title="Excluir" />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Editar" onPress={handleEdit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    padding: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
  },
  infoContainer: {
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    flex: 0.875,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    width: 250,
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  dropdownButtonStyle: {
    width: 250,
    height: 50,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 5,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontWeight: 'bold',
    gap: 5,
  },
  dropdownMenuStyle: {
    borderRadius: 4,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 5,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
