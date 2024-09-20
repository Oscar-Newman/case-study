package com.casestudy.model;
import java.sql.Date;
import static typeEnum.typeEnum;

public class Compensation {

    private int compensationId;
    private typeEnum type;
    private float amount;
    private String description;
    private Date date;
    private int employeeId;

    public int getCompensationId() {
        return this.compensationId;
    }

    public void setCompensationId(int compensationId) {
        this.compensationId = compensationId;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public float getAmount() {
        return this.amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getEmployeeId() {
        return this.employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public String toString() {
        return "Compensation [compensationId=" + compensationId + ", type=" + type + ", amount=" + amount + ", description=" + description + 
        ", date=" + date + ", employeeId=" + employeeId + "]";
    }

}
