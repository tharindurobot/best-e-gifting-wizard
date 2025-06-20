
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BoxManagement from './BoxManagement';
import ItemManagement from './ItemManagement';
import CardManagement from './CardManagement';

const AdminPanel = () => {
  const [isVisible, setIsVisible] = useState(false);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4">
        <Button onClick={() => setIsVisible(true)} variant="outline">
          Admin Panel
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>BEST E - Admin Panel</CardTitle>
          <Button onClick={() => setIsVisible(false)} variant="outline">
            Close
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="boxes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="boxes">Manage Boxes</TabsTrigger>
              <TabsTrigger value="items">Manage Items</TabsTrigger>
              <TabsTrigger value="cards">Manage Cards</TabsTrigger>
            </TabsList>

            <TabsContent value="boxes">
              <BoxManagement />
            </TabsContent>

            <TabsContent value="items">
              <ItemManagement />
            </TabsContent>

            <TabsContent value="cards">
              <CardManagement />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
