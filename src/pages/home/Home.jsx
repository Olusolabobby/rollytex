import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  // const data = {
  //   id:"1",
  //   name: '',
  //   children: [
  //     {
  //       id:"1.1",
  //       name: '',
  //       children: [
  //         {
  //           id:"1.1.1",
  //           name: '',
  //           children: [
  //
  //           ]
  //         },
  //         {
  //           id:"1.1.2",
  //           name: '',
  //           children: [
  //             {
  //               id:"1.1.2.1",
  //               name: '',
  //               children: [
  //                 {
  //                   id:"1.1.2.1.1",
  //                   name: '',
  //                   children: [
  //
  //                   ]
  //                 },
  //                 {
  //                   id:"1.1.2.1.2",
  //                   name: '',
  //                   children: [
  //
  //                   ]
  //                 }
  //               ]
  //             },
  //             {
  //               id:"1.1.2.2",
  //               name: '',
  //               children: [
  //
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       id:"1.2",
  //       name: '',
  //       children: [
  //         {
  //           id:"1.2.1",
  //           name: '',
  //           children: [
  //
  //           ]
  //         },
  //         {
  //           id:"1.2.2",
  //           name: '',
  //           children: [
  //
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  //
  //
  // }
  //
  // const flattenData = {
  //   '1':  {
  //     id:"1",
  //     name: '',
  //     children: [
  //       {
  //         id:"1.1",
  //         name: '',
  //         children: [
  //           {
  //             id:"1.1.1",
  //             name: '',
  //             children: [
  //
  //             ]
  //           },
  //           {
  //             id:"1.1.2",
  //             name: '',
  //             children: [
  //
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         id:"1.2",
  //         name: '',
  //         children: [
  //           {
  //             id:"1.2.1",
  //             name: '',
  //             children: [
  //
  //             ]
  //           },
  //           {
  //             id:"1.2.2",
  //             name: '',
  //             children: [
  //
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   '1.1':    {
  //     id:"1.1",
  //     name: '',
  //     children: [
  //       {
  //         id:"1.1.1",
  //         name: '',
  //         children: [
  //
  //         ]
  //       },
  //       {
  //         id:"1.1.2",
  //         name: '',
  //         children: [
  //
  //         ]
  //       }
  //     ]
  //   },
  // }
  //
  // console.log(data);
  //
  // const getFlattenData = (obj) => {
  //   // const flattenObj = {
  //   //   [obj.id]: obj
  //   // }
  //   const flattenObj = []
  //   flattenObj.push(obj)
  //   const getChildren = (childrenArray) => {
  //     childrenArray.forEach((child) => {
  //       // flattenObj[child.id] = child
  //       flattenObj.push(child)
  //       child?.children && getChildren(child?.children)
  //     })
  //   }
  //
  //   obj?.children && getChildren(obj?.children)
  //
  //   console.log('flattenObj',flattenObj);
  //   return flattenObj
  // }
  //
  // const newObject = getFlattenData(data)
  // // console.log(newObject, newObject['1.1.1']);
  // console.log(newObject, newObject.filter(item => item.id === '1.1.1')[0]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="order" />
          <Widget type="delivery" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
