import EmptyState from '@/components/EmptyState';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Bookmark = () => {
    return (
        <View className='bg-primary h-full'>
            <View className='w-full h-full flex justify-center'>
                <EmptyState title='Under Development'
                    subtitle='Please visit later'

                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Bookmark;
