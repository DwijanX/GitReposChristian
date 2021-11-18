#include "NodeGraph.h"
NodeGraph::NodeGraph()
{
    this->Marked=false;
    this->Father=-1;
    this->Distance=MAX_INT;
}
NodeGraph::~NodeGraph()
{
    
}
int NodeGraph::getFather()
{
    return Father;
}
void NodeGraph::setFather(int Father)
{
    this->Father=Father;
}
    
bool NodeGraph::getMarked()
{
    return Marked;
}
void NodeGraph::setMarked(bool Marked)
{
    this->Marked=Marked;
}
Lista8<pair<int,int>>& NodeGraph::getLista()
{
    return AdjacentList;
}
void NodeGraph::setNodeGraphToInitialState()
{
    this->Marked=false;
    this->Father=-1;
    this->Distance=MAX_INT;
}

void NodeGraph::setDistance(int Distance)
{
    this->Distance=Distance;
}

void NodeGraph::addDistance(int Distance)
{
    this->Distance+=Distance;
}
int NodeGraph::getDistance()
{
    return Distance;
}
