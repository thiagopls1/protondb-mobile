import { View, ScrollView, StyleSheet, Text, StatusBar } from 'react-native';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.landingContainer}>
        <Text style={styles.titleCenter}>
          Bem vindo ao seu lar para ver relatórios de compatibilidade de jogos
          para Linux e Steam Deck!
        </Text>
        <View style={styles.reportsContainer}>
          <View>
            <Text style={styles.titleStart}>Jogos Chromebook Ready</Text>
            <Text style={styles.reportText}>➡️ 176 Jogáveis</Text>
          </View>
          <View>
            <Text style={styles.titleStart}>Verificados no Steam Deck</Text>
            <Text style={styles.reportText}>➡️ 6.251 Verificados</Text>
            <Text style={styles.reportText}>
              ➡️ 19.307 Verificados ou jogáveis
            </Text>
          </View>
          <View>
            <Text style={styles.titleStart}>Jogos no ProtonDB</Text>
            <Text style={styles.reportText}>
              ➡️ 11.254 recomendados por 3 ou mais pessoas
            </Text>
            <Text style={styles.reportText}>
              ➡️ 15.205 recomendados por 2 ou mais pessoas
            </Text>
            <Text style={styles.reportText}>
              ➡️ 25.070 recomendados por pelo menos uma pessoa
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    // This will avoid container above StatusBar
    marginTop: StatusBar.currentHeight,
  },
  landingContainer: {
    flex: 0.2,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    gap: 50,
  },
  titleCenter: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleStart: {
    fontSize: 22,
    textAlign: 'start',
    fontWeight: 'bold',
  },
  reportText: {
    fontSize: 19,
    lineHeight: 24,
    paddingVertical: 5,
  },
  reportsContainer: {
    paddingHorizontal: 5,
    gap: 25,
  },
});
