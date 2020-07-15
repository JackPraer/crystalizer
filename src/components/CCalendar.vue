<template>
  <div class="cr-calendar">
    <header class="cr-calendar__header">
      <button class="cr-calendar__arrow" @click.prevent="previousYear">
        &lt;&lt;
      </button>
      <button class="cr-calendar__arrow" @click.prevent="previousMonth">
        &lt;
      </button>
      <span class="cr-calendar__month-year">
        <slot :date="currDateCursor">
          {{ currDateCursor | formatDate }}
        </slot>
      </span>
      <button class="cr-calendar__arrow" @click.prevent="nextMonth">
        &gt;
      </button>
      <button class="cr-calendar__arrow" @click.prevent="nextYear">
        &gt;&gt;
      </button>
    </header>
    <div class="cr-calendar__headings">
      <span
        class="cr-calendar__weekday"
        v-for="dayLabel in dayLabels"
        :key="dayLabel"
      >
        {{ dayLabel }}</span
      >
    </div>
    <span
      v-for="(day, index) in dates"
      class="cr-calendar__day"
      :class="dayClassObj(day)"
      :key="index"
      @click.prevent="setSelectedDate(day)"
      >{{ day.date | formatDateToDay }}</span
    >
  </div>
</template>

<script>
import {
  setMonth,
  addMonths,
  getMonth,
  isSameMonth,
  getDay,
  isSameDay,
  isToday,
  addDays,
  lastDayOfMonth,
  startOfMonth,
  eachDayOfInterval,
  format,
  addYears,
} from "date-fns";

const DAYS_OF_WEEK = 7;

export default {
  data: () => ({
    today: null,
    selectedDate: null,
    currDateCursor: null,
  }),
  created() {
    this.today = new Date();
    this.selectedDate = this.today;
    this.currDateCursor = this.today;
  },
  props: {
    startDate: Date,
    firstDayWeek: {
      type: Number,
      default: 0,
    },
    dayLabels: {
      type: Array,
      default: () => ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    },
  },
  computed: {
    currentMonth() {
      return this.currDateCursor.getMonth();
    },
    dates() {
      const cursorDate = this.currDateCursor;

      const startDateOfMonth = startOfMonth(cursorDate);
      const endDateOfMonth = lastDayOfMonth(cursorDate);

      const daysPrevMonth = getDay(startDateOfMonth - 1) + DAYS_OF_WEEK;

      console.log();
      const daysNeededForLastMonth =
        daysPrevMonth >= DAYS_OF_WEEK
          ? daysPrevMonth - DAYS_OF_WEEK
          : daysPrevMonth;

      const daysNextMonth = DAYS_OF_WEEK - getDay(endDateOfMonth);
      console.log(daysNextMonth);

      const daysNeededForNextMonth =
        daysNextMonth >= DAYS_OF_WEEK ? 0 : daysNextMonth;

      const startDate = addDays(startDateOfMonth, -daysNeededForLastMonth);
      const endDate = addDays(endDateOfMonth, daysNeededForNextMonth);

      return eachDayOfInterval({ start: startDate, end: endDate }).map(
        (date) => ({
          date,
          isCurrentMonth: isSameMonth(cursorDate, date),
          isToday: isToday(date),
          isSelected: isSameDay(this.selectedDate, date),
        })
      );
    },
  },
  mounted() {
    if (this.startDate) {
      this.currDateCursor = this.startDate;
      this.selectedDate = this.startDate;
    }
  },
  methods: {
    dayClassObj(day) {
      return {
        today: day.isToday,
        current: day.isCurrentMonth,
        selected: day.isSelected,
      };
    },
    nextMonth() {
      this.currDateCursor = addMonths(this.currDateCursor, 1);
    },
    previousMonth() {
      this.currDateCursor = addMonths(this.currDateCursor, -1);
    },
    nextYear() {
      this.currDateCursor = addYears(this.currDateCursor, 1);
    },
    previousYear() {
      this.currDateCursor = addYears(this.currDateCursor, -1);
    },
    setSelectedDate(day) {
      this.selectedDate = day.date;
      this.$emit("input", this.selectedDate);
      // change calendar to correct month if they select previous or next month's days
      if (!day.isCurrentMonth) {
        const selectedMonth = getMonth(this.selectedDate);
        this.currDateCursor = setMonth(this.currDateCursor, selectedMonth);
      }
    },
  },
  filters: {
    formatDateToDay(val) {
      return format(val, "d");
    },
    formatDate(val) {
      return format(val, "dd.MM.yyyy");
    },
  },
};
</script>

<style lang="scss" scoped>
.cr-calendar {
  --white: #fff;
  --light-gray: #f0f0f0;
  --main-color: red;
  --additional-color: blue;

  --main-gray: gray;

  background-color: var(--white);
  border-radius: 3px;
  display: flex;
  width: calc(100% - 0.25rem);
  flex-flow: row wrap;
  // padding: 0.5rem 0.25rem;
  padding: 1.5rem;
  box-sizing: border-box;
  // padding: 1rem;
  background: #fff;
}

.cr-calendar__header {
  flex: 1 1 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 0.25rem;
  min-height: 2rem;
  align-items: center;
  color: var(--main-color);
}

.cr-calendar__arrow {
  display: flex;
  border: none;
  padding: 0.25rem 0.5rem;
  background: #fff;
  color: var(--main-gray);
  transition: color 0.2s;
  height: 100%;
  flex: 0 0 20%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.cr-calendar__month-year {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
}

.cr-calendar__arrow:hover {
  color: #000;
}

.cr-calendar__headings {
  display: flex;
  flex: 1 1 100%;
  flex-flow: row nowrap;
  justify-content: space-around;
  padding: 0.5rem 0;
  font-weight: lighter;
  font-size: 1rem;
  color: var(--main-color);
}

.cr-calendar__weekday:nth-child(-n + 5) {
  color: var(--gray);
}

.cr-calendar__day {
  display: flex;
  flex: 0 0 auto;
  max-width: calc(100% / 7);
  min-width: calc(100% / 7);
  min-height: 2rem;
  border: none;
  background: #fff;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  padding: 0;
  font-weight: lighter;
  color: var(--main-gray);
  transition: background 0.2s;
  font-size: 1rem;
  cursor: pointer;
  border-top: 1px solid var(--light-gray);
  font-family: "Roboto";
}

.cr-calendar__day.current {
  color: #000;
}

.cr-calendar__day:hover {
  background: var(--light-gray);
}

.cr-calendar__day.selected {
  background: var(--additional-color);
}

.cr-calendar__year {
  border: none;
  display: inline;
  max-width: 4rem;
  font-size: inherit;
  text-align: center;
  // border-bottom: 1px solid var(--gray);
  color: var(--main-color);
}
</style>
