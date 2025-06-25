
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import BoxManagement from './BoxManagement';
import ItemManagement from './ItemManagement';
import CardManagement from './CardManagement';
import PaperColorManagement from './PaperColorManagement';
import BoxFillManagement from './BoxFillManagement';

const AdminPanel = () => {
  const { logout } = useAuth();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>BEST E - Admin Panel</CardTitle>
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="boxes" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="boxes">Manage Boxes</TabsTrigger>
            <TabsTrigger value="items">Manage Items</TabsTrigger>
            <TabsTrigger value="fills">Box Fills</TabsTrigger>
            <TabsTrigger value="cards">Manage Cards</TabsTrigger>
            <TabsTrigger value="colors">Paper Colors</TabsTrigger>
          </TabsList>

          <TabsContent value="boxes">
            <BoxManagement />
          </TabsContent>

          <TabsContent value="items">
            <ItemManagement />
          </TabsContent>

          <TabsContent value="fills">
            <BoxFillManagement />
          </TabsContent>

          <TabsContent value="cards">
            <CardManagement />
          </TabsContent>

          <TabsContent value="colors">
            <PaperColorManagement />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;
