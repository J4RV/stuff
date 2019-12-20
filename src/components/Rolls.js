import Collapse from "@material-ui/core/Collapse"
import Dices from "../icons/Dices"
import Paper from "@material-ui/core/Paper"
import React from "react"
import Skull from "../icons/Skull"
import Typography from "@material-ui/core/Typography"
import blue from "@material-ui/core/colors/blue"
import { connect } from "react-redux"
import grey from "@material-ui/core/colors/grey"
import red from "@material-ui/core/colors/red"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  roll: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    width: theme.spacing.unit * 18,
    position: "relative",
  },
  red: {
    color: red[500],
  },
  blue: {
    color: blue[500],
  },
  datetime: {
    color: grey[500],
    fontSize: theme.typography.fontSize * 0.8,
  },
  index: {
    color: grey[500],
    fontSize: theme.typography.fontSize,
    position: "absolute",
    right: theme.spacing.unit,
  },
  dices: {
    padding: theme.spacing.unit,
    fontSize: "1.5em",
    textAlign: "center",
  },
})

const RollResult = ({
  attackerRolls,
  defenderRolls,
  attackers,
  defenders,
  moment,
  deadAttackers,
  deadDefenders,
  index,
  classes,
}) => (
  <Paper className={classes.roll}>
    <div>
      <Typography variant="title" align="center">
        <div className={classes.datetime}>
          {`${moment.getHours()}h ${moment.getMinutes()}m ${moment.getSeconds()}s`}
        </div>
        <div className={classes.index}>{index}</div>
        <span className={classes.red}>
          <span>{attackers} </span>
        </span>
        <span> vs </span>
        <span className={classes.blue}>
          <span> {defenders}</span>
        </span>
        <div className={classes.dices}>
          <span className={classes.red}>
            {attackerRolls.map(value => Dices[value])}
          </span>
          <span className={classes.blue}>
            {defenderRolls.map(value => Dices[value])}
          </span>
        </div>
        <div>
          {Array(deadAttackers)
            .fill()
            .map(() => (
              <Skull color={red[400]} />
            ))}
          {Array(deadDefenders)
            .fill()
            .map(() => (
              <Skull color={blue[400]} />
            ))}
        </div>
      </Typography>
    </div>
  </Paper>
)

const Rolls = ({ rolls, classes, show }) => (
  <Collapse in={show && rolls.length > 0}>
    <div className={classes.container}>
      {rolls.map((roll, i) => (
        <RollResult
          key={`roll-${i}`}
          {...roll}
          index={i + 1}
          show={show}
          rollClass={classes.roll}
          classes={classes}
        />
      ))}
    </div>
  </Collapse>
)

export default connect(state => ({
  rolls: state.rolls,
  show: state.showRolls,
}))(withStyles(styles)(Rolls))