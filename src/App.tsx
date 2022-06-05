// 3rd Party Packages
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

// Containers
import AllAssetsSection from "./containers/AllAssetsSection";
import MyNFtsSection from "./containers/MyNFtsSection";

function App() {
  return (
    <div className="App">
      <Tabs colorScheme="cyan">
        <TabList>
          <Tab>Latest NFTs</Tab>
          <Tab>My NFTs</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AllAssetsSection />
          </TabPanel>
          <TabPanel>
            <MyNFtsSection />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default App;
