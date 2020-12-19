#include "BufferQueue.h"

#include <exception>

BufferQueue::BufferQueue(const size_t bufferSize):
    bufferSize(bufferSize)
{
    taskVector = std::vector<MyTaskPointer>(bufferSize);
    taskVector.reserve(bufferSize);
}

int BufferQueue::addTask(const MyTaskPointer newTask)
{
    consumptedSpace++;
    if (consumptedSpace > bufferSize) {
        MyTaskPointer canceledTask = getNextTask();
        statistics->taskRejected(canceledTask->getSourceNumber(), newTask->getStartTime() - canceledTask->getStartTime());
        return -1;//means rejection
    }

    int currentPosition = placementPosition;//cause it'll change and shit idk

    taskVector.at(placementPosition++) = newTask;

    if (bufferSize == placementPosition) {
        placementPosition = 0;
    }
    return currentPosition; //yeah boii
}

bool BufferQueue::isEmpty()
{
    return consumptedSpace == 0;
}

MyTaskPointer BufferQueue::getNextTask()
{
    if (bufferSize == takePosition) {
        takePosition = 0;
    }
    if (consumptedSpace == 0) {
        throw new std::runtime_error("Buffer is empty. Can not receive task");
    }
    consumptedSpace--;
    MyTaskPointer returnValue = taskVector.at(takePosition);
    taskVector.at(takePosition++) = nullptr;
    return returnValue;
}

size_t BufferQueue::getBufferSize() const
{
    return bufferSize;
}

size_t BufferQueue::getConsumptedSpace() const
{
    return consumptedSpace;
}

size_t BufferQueue::getPlacementPosition() const
{
    return placementPosition;
}

size_t BufferQueue::getTakePosition() const
{
    return takePosition;
}

std::vector<MyTaskPointer> BufferQueue::getTaskVector() const
{
    return taskVector;
}
