import React from "react";
import { Typography } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { Grid } from "@material-ui/core";
import styles from "./NFATable.module.css";
import Icon from "react-crypto-icons";
import { Link } from "react-router-dom";


const CoinImage = (props) => {
  const userID = props.userID;
  const coinID = props.coinID;
  const coinSymbol = props.symbolsDict[coinID];
  const lowerCoinSymbol = (coinSymbol && coinSymbol.toLowerCase()) || "generic";

  const clickHandler = () => {
    console.log(`${coinSymbol} has been clicked.`);
  };

  return (
    <Link
      to={`/coinDetails/${userID}/${coinID}/${coinSymbol}`}
      className={styles.noDecoration}
    >
      <Grid
        container
        direction="columnn"
        alignItems="center"
        justifyContent="center"
        className={styles.coinAggregate}
        onClick={clickHandler}
      >
        <Grid item>
          <Icon name={lowerCoinSymbol} size={32}></Icon>
        </Grid>
        <Grid item>
          <Typography className={styles.coinText}>
            {coinSymbol || "NA"}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
};

// const NumericEntry = ({
//   val,
//   isColor,
//   numDecimalPlaces = 0,
//   additionalSuffix = "",
// }) => {
//   const multiplier = 10 ** numDecimalPlaces;
//   const formatedVal = Math.round(val * multiplier) / multiplier;
//   const styleClass = isColor
//     ? formatedVal > 0
//       ? styles.profit
//       : styles.loss
//     : styles.normal;
//   const outputString = `${formatedVal}${additionalSuffix}`;
//   return <Typography className={styleClass}>{outputString}</Typography>;
// };

export function NFATable(props) {
  // const [getPredict, setGetPredict] = useState({});

  // if (count % 30 === 0) {
  //   axios
  //     .get(coinPredict)
  //     .then((response) => {
  //       // console.log("Front-end");
  //       // for (let i = 0; i < 2; i++) {
  //       //   console.log(props.userData[i].id);
  //       // }

  //       setGetPredict(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log("Error");
  //     });
  // }
  // count = count + 1;
  // console.log(count);

  return (
    <>
      <Box className={styles.tableBox}>
        <Table
          sx={{ minWidth: 200 }}
          size="small"
          aria-label="a dense table"
          className={styles.tableDesign}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography className={styles.tableHeading} variant="h7">
                  Coin
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className={styles.tableHeading} variant="h7">
                  Tomorrow
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className={styles.tableHeading} variant="h7">
                  {" "}
                  Next Week
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.userData.map((userDataElement) => {
              // const lowerCaseID = userDataElement.id.toLowerCase();
              // const coinPrice = props.pricesData[lowerCaseID];

              return (
                <TableRow key={userDataElement.id}>
                  <TableCell component="th" scope="row">
                    <CoinImage
                      userID={props.userID}
                      coinID={userDataElement.id}
                      symbolsDict={props.coinNameToSymbolDict}
                    ></CoinImage>
                  </TableCell>
                  <TableCell align="center">
                    {props.predictData &&
                    !(
                      typeof props.predictData === "object" &&
                      !Array.isArray(props.predictData) &&
                      props.predictData !== null
                    )
                      ? props.predictData.map((obj) =>
                          obj.name === userDataElement.id
                            ? obj.predictions.toFixed(4)
                            : "",
                        )
                      : "loading..."}
                  </TableCell>
                  <TableCell align="center">
                    {props.predictDataWeekly &&
                    !(
                      typeof props.predictDataWeekly === "object" &&
                      !Array.isArray(props.predictDataWeekly) &&
                      props.predictDataWeekly !== null
                    )
                      ? props.predictDataWeekly.map((obj) =>
                          obj.name === userDataElement.id
                            ? obj.predictions.toFixed(4)
                            : "",
                        )
                      : "loading..."}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
