import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';

// Register font
// Font.register({ family: 'Roboto', src: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,100,200,300,400,500,600,700,800,900&display=swap' });

const styles = StyleSheet.create({
  light_title: {
    // fontFamily: 'Roboto',
    fontSize: '20px',
    fontWeight: '100'
  }
});

function PDF() {

  return (
    <PDFViewer style={{ height: '85vh' }}>
      <Document>
        <Page style={{ padding: '20px' }}>

          {/* Logo & Address */}
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text>Logo</Text>
            </View>
            <View>
              <Text style={{ fontSize: '10px' }}>A. Katsionis Design</Text>
              <Text style={{ fontSize: '10px' }}>ABN 59 124 461 310</Text>
              <Text style={{ fontSize: '10px' }}>Waterman Chadstone</Text>
              <Text style={{ fontSize: '10px' }}>Level 2, UL40, 1341 Dandenong Rd</Text>
              <Text style={{ fontSize: '10px' }}>Chadstone 3148</Text>
              <Text style={{ fontSize: '10px' }}>www.ak-d.com.au</Text>
            </View>
          </View>

          {/* Meta */}
          <View style={{ marginTop: '60px' }}>
            <Text style={[styles.light_title, { marginBottom: '15px' }]}>Estimate</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '60%' }}>
              <Text style={{ fontSize: '10px' }}>A. Katsionis Design</Text>
              <Text style={{ fontSize: '10px' }}>ABN 59 124 461 310</Text>
              <Text style={{ fontSize: '10px' }}>Waterman Chadstone</Text>
              <Text style={{ fontSize: '10px' }}>Level 2, UL40, 1341 Dandenong Rd</Text>
              <Text style={{ fontSize: '10px' }}>Chadstone 3148</Text>
              <Text style={{ fontSize: '10px' }}>www.ak-d.com.au</Text>
            </View>
            <View style={{ width: '40%' }}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ width: '50%', fontSize: '10px' }}>Date</Text>
                <Text style={{ width: '50%', fontSize: '10px' }}>20 November 2019</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ width: '50%', fontSize: '10px' }}>Your Contact</Text>
                <Text style={{ width: '50%', fontSize: '10px' }}>Taso Katsionis</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ width: '50%', fontSize: '10px' }}>Invoice No.</Text>
                <Text style={{ width: '50%', fontSize: '10px' }}>0386</Text>
              </View>
            </View>
          </View>

          {/* Items */}
          <View style={{ marginTop: '60px' }}>
            <Text style={[styles.light_title, { marginBottom: '15px', borderBottom: '1px solid #000', paddingBottom: '15px' }]}>Prefix Job Name</Text>
          </View>

          <View style={{ marginBottom: '30px' }}>
            <Text style={{ fontSize: '16px', marginBottom: '10px' }}>Item Description</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: '10px', width: '60%' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text style={{ fontSize: '10px' }}>$1000</Text>
            </View>
          </View>

          <View style={{ marginBottom: '30px' }}>
            <Text style={{ fontSize: '16px', marginBottom: '10px' }}>Item Description</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: '10px', width: '60%' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text style={{ fontSize: '10px' }}>$1000</Text>
            </View>
          </View>

          <View style={{ marginBottom: '30px' }}>
            <Text style={{ fontSize: '16px', marginBottom: '10px' }}>Item Description</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: '10px', width: '60%' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text style={{ fontSize: '10px' }}>$1000</Text>
            </View>
          </View>

        </Page>
      </Document>
    </PDFViewer>
  )
}

export default PDF
