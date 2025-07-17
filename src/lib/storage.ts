"use client";

import { useState, useEffect, useCallback } from 'react';

export interface Delivery {
  id: string;
  date: string;
  shopkeeperName: string;
  phone: string;
  address: string;
  bars: number;
  cartoons: number;
  totalBill: number;
  dueBill: number;
  pendingPayment: number;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  address: string;
}

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      } else {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        setStoredValue(initialValue);
      }
    } catch (error) {
      console.log(error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function useDeliveries() {
    const [deliveries, setDeliveries] = useLocalStorage<Delivery[]>('deliveries', []);

    const addDelivery = useCallback((delivery: Omit<Delivery, 'id' | 'date'>) => {
        const newDelivery: Delivery = {
            ...delivery,
            id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString().split('T')[0],
        };
        setDeliveries(prev => [newDelivery, ...prev]);
    }, [setDeliveries]);

    return { deliveries, addDelivery, setDeliveries };
}

export function useContacts() {
    const [contacts, setContacts] = useLocalStorage<Contact[]>('contacts', []);
    const { deliveries } = useDeliveries();
  
    useEffect(() => {
        const existingContacts = new Map<string, Contact>();
        contacts.forEach(c => existingContacts.set(c.name.toLowerCase(), c));

        const updatedContacts = [...contacts];

        deliveries.forEach(delivery => {
            if (!existingContacts.has(delivery.shopkeeperName.toLowerCase())) {
                const newContact: Contact = {
                    id: delivery.shopkeeperName.toLowerCase().replace(/\s+/g, '-'),
                    name: delivery.shopkeeperName,
                    phone: delivery.phone,
                    address: delivery.address,
                };
                updatedContacts.push(newContact);
                existingContacts.set(newContact.name.toLowerCase(), newContact);
            }
        });
        
        if(updatedContacts.length > contacts.length) {
            setContacts(updatedContacts);
        }

    }, [deliveries, contacts, setContacts]);
  
    return { contacts };
}
