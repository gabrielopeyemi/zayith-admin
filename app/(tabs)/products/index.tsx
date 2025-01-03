import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import { Link } from 'expo-router';
// import Header from '@/components/header';
import LoadingState from '@/components/loadingState';
import { API_URL, storeId } from '@/constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
}
export default function Home() {
  const { height, width } = Dimensions.get('window');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchProducts = useCallback(async (currentPage: number) => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await axios.get<Product[]>(
        `${API_URL}/products/get-all-product/${storeId}`,
        {
          params: { page: currentPage, limit: 10 },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...response.data]);
        setPage(currentPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  }, [hasMore]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchProducts(page);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <Link
      href={{
        pathname: '/products/[id]',
        params: { id: item._id },
      }}
      style={{
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 5,
        width: width / 2 - 15,
        paddingBottom: 10,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        {/* <Image
          style={{
            alignSelf: 'center',
            width: width,
            height: height * 0.2,
          }}
          source={{ uri: item.imageUrl }}
          resizeMode="cover"
        /> */}
        <Text style={styles.itemTitle}>{item.name}</Text>
      </View>
    </Link>
  );

  const handleEmpty = () => (
    <Text style={styles.emptyText}>No data available. Please try again later.</Text>
  );

  const separator = () => <View style={{ margin: 10 }} />;

  const renderFooter = () => {
    if (!hasMore) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>No more products to load</Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="small" color="#666" />
        </View>
      );
    }

    return null;
  };

  if (loading && page === 1) {
    return <LoadingState />;
  }

  if (error && page === 1) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, i) => `${item._id}-${i}`}
        ListEmptyComponent={handleEmpty}
        ItemSeparatorComponent={separator}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 5,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 14,
    // textAlign: '',
    padding: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
