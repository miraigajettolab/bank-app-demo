#include "SystemEvent.h"

SystemEvent::SystemEvent(const long eventTime, EventType eventType, int assignedDevice, int assignedBuffer):
    eventTime(eventTime), eventType(eventType), assignedDevice(assignedDevice),assignedBuffer(assignedBuffer)
{
}

const EventType SystemEvent::getEventType() const
{
    return eventType;
}

const long SystemEvent::getEventTime() const
{
    return eventTime;
}

const int SystemEvent::getAssignedDevice() const
{
    return assignedDevice;
}

void SystemEvent::setAssignedDevice(int value)
{
    assignedDevice = value;
}

const int SystemEvent::getAssignedBuffer() const
{
    return assignedBuffer;
}

void SystemEvent::setAssignedBuffer(int value)
{
    assignedBuffer = value;
}
